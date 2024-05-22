#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

// Wi-Fi credentials
const char* ssid = "Salmen's Galaxy A52";
const char* password = "salmenabbes1";

// MQTT Broker settings
const char* mqttServer = "192.168.45.232";
const int mqttPort = 1883;
const char* mqttUser = ""; 
const char* mqttPassword = ""; 
const char* mqttClientId = "esp32"; 

// MQTT topics
const char* Topic = "sensor/readings";


// DHT sensor settings
#define DHT_PIN 13
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Set MQTT server and callback
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  // Initialize DHT sensor
  dht.begin();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read temperature and humidity from DHT sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  
  // Check if readings are valid
  if (!isnan(temperature) && !isnan(humidity)) {
    StaticJsonDocument<200> jsonDocument;
    jsonDocument["temperature"] = temperature;
    jsonDocument["humidity"] = humidity;

    String jsonString;
    serializeJson(jsonDocument, jsonString);
    
    client.publish(Topic, jsonString.c_str());
    Serial.print("Published temperature and humidity: ");
    Serial.print(temperature);
    Serial.print(" °C, ");
    Serial.print(humidity);
    Serial.println(" %");
  } else {
    Serial.println("Failed to read from DHT sensor");
  }

  delay(5000); // Publish every 5 seconds
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Handle incoming MQTT messages
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]: ");
  for (unsigned int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until reconnected
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    
    // Attempt to connect
    if (client.connect(mqttClientId, mqttUser, mqttPassword)) {
      Serial.println("Connected to MQTT broker");
    } else {
      Serial.print("Failed to connect, rc=");
      Serial.print(client.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}
