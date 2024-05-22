import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const MapWrapper = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        title="Live Stream"
        src="http://192.168.242.134/"
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
};

function Map() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Live Cam</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <MapWrapper />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
