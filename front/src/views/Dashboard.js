import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import NotificationAlert from "react-notification-alert";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const notificationAlertRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 180000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const latestTemperature = parseInt(data[data.length - 1].temperature);
      showNotification(latestTemperature);
    }
  }, [data]);

  const showNotification = (temperature) => {
    let type;
    let message;
    if (temperature <= 15) {
      type = "success";
      message = <div>Temperature is low: {temperature} °C</div>;
    } else if (temperature >= 20) {
      type = "danger";
      message = <div>Temperature is high: {temperature} °C</div>;
    } else {
      return; // Do not show notification if temperature is within normal range
    }

    const options = {
      place: "tr", // top right
      message: message,
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const temperature = data.length > 0 ? parseInt(data[data.length - 1].temperature) : 0;
  const humidity = data.length > 0 ? parseInt(data[data.length - 1].humidity) : 0;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    console.log("Original timestamp:", timestamp, "Parsed date:", date);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString();
  };

  const chartData = (key) => ({
    labels: data.map(item => formatTimestamp(item.timestamp)),
    datasets: [
      {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        data: data.map(item => item[key]),
        fill: false,
        borderColor: key === 'temperature' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        tension: 0.1
      }
    ]
  });

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlertRef} />
        <Row>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-sun-fog-29 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Temperature</p>
                      <CardTitle tag="p">{temperature} °C</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Updated just now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Humidity</p>
                      <CardTitle tag="p">{humidity} %</CardTitle>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Updated just now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <div style={{ height: '400px' }}>
                  <Line data={chartData('temperature')} options={chartOptions} />
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated just now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <div style={{ height: '400px' }}>
                  <Line data={chartData('humidity')} options={chartOptions} />
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated just now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
