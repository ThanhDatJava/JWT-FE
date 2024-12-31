import logo from "../../../../assets/img/logo.png";

import React from "react";
import { Carousel, Image, QRCode } from "antd";
import "./defaultHomePage.css";

const contentStyle: React.CSSProperties = {
  height: "80vh",
  background: "#ccc",
  display: "flex",
  flexDirection: "row",
};

const DefaultHomePage: React.FC = () => (
  <div className="Carousel-DefaultHomePage">
    <Carousel autoplay className="DefaultHomePage-Carousel">
      <div className="DefaultHomePage-Carousel-content">
        <div style={contentStyle} className="Carousel-content">
          <Image
            width="50%"
            height="100%"
            preview={{
              destroyOnClose: true,
              imageRender: () => (
                <video
                  muted
                  width="80%"
                  controls
                  src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
                />
              ),
              toolbarRender: () => null,
            }}
            src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-96387.jpg"
          />
          <div className="Carousel-content-right">
            <div className="titile">Niềm vui trong từng ngụm</div>
            <div>
              Thưởng thức sự kỳ diệu của những ngày lễ với Peppermint Mocha,
              Caramel Brulée Latte hoặc Chestnut Praline Latte.
            </div>
            <QRCode errorLevel="H" value="http://localhost:3000/" />
          </div>
        </div>
      </div>
      <div className="DefaultHomePage-Carousel-content">
        <div style={contentStyle} className="Carousel-content">
          <Image
            width="50%"
            height="100%"
            preview={{
              destroyOnClose: true,
              imageRender: () => (
                <video
                  muted
                  width="80%"
                  controls
                  src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
                />
              ),
              toolbarRender: () => null,
            }}
            src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-96387.jpg"
          />
          <div className="Carousel-content-right">
            <div className="titile">Niềm vui trong từng ngụm</div>
            <div>
              Thưởng thức sự kỳ diệu của những ngày lễ với Peppermint Mocha,
              Caramel Brulée Latte hoặc Chestnut Praline Latte.
            </div>
            <QRCode errorLevel="H" value="http://localhost:3000/" />
          </div>
        </div>
      </div>
      <div className="DefaultHomePage-Carousel-content">
        <div style={contentStyle} className="Carousel-content">
          <Image
            width="50%"
            height="100%"
            preview={{
              destroyOnClose: true,
              imageRender: () => (
                <video
                  muted
                  width="80%"
                  controls
                  src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
                />
              ),
              toolbarRender: () => null,
            }}
            src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-96387.jpg"
          />
          <div className="Carousel-content-right">
            <div className="titile">Niềm vui trong từng ngụm</div>
            <div>
              Thưởng thức sự kỳ diệu của những ngày lễ với Peppermint Mocha,
              Caramel Brulée Latte hoặc Chestnut Praline Latte.
            </div>
            <QRCode errorLevel="H" value="http://localhost:3000/" />
          </div>
        </div>
      </div>
    </Carousel>
  </div>
);

export default DefaultHomePage;
