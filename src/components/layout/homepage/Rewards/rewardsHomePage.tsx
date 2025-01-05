import { useState, useRef } from "react";

export default function RewardsHomePage() {
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotateDegree, setRotateDegree] = useState(0); // Lưu góc quay

  const wheelRef = useRef<HTMLDivElement | null>(null); // Khai báo ref cho vòng quay

  // 5 phần thưởng và màu sắc tương ứng
  const prizes = ["5%", "10%", "15%", "20%", "25%"];
  const colors = ["#ff6347", "#32cd32", "#1e90ff", "#ff8c00", "#8a2be2"]; // Màu sắc cho từng phần thưởng

  const totalPrizes = prizes.length;
  const anglePerPrize = 360 / totalPrizes; // Mỗi phần thưởng chiếm bao nhiêu độ

  // Hàm quay vòng may mắn
  const spinWheel = () => {
    setSpinning(true);
    setResult("");

    // Tạo chuyển động quay vòng
    let rotation = 0;
    let spins = 0;
    const totalSpins = 5; // Số vòng quay mong muốn

    const spinInterval = setInterval(() => {
      rotation += 15;
      spins++;

      // Kiểm tra để dừng quay sau khi đã quay đủ số vòng
      if (spins >= totalSpins * 24) {
        clearInterval(spinInterval);
        const finalDegree = 360 * totalSpins + Math.random() * 360;
        setRotateDegree(finalDegree); // Cập nhật góc quay

        // Tính toán phần thưởng trúng dựa trên góc quay
        const prizeIndex = Math.floor((finalDegree % 360) / anglePerPrize);
        setResult(prizes[prizeIndex]); // Cập nhật kết quả

        setSpinning(false);
      }

      // Cập nhật vòng quay
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${rotation}deg)`;
      }
    }, 10);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Vòng Quay May Mắn</h1>
      {/* Vòng quay */}
      <div
        ref={wheelRef}
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `conic-gradient(${colors[0]} 0% 20%, ${colors[1]} 20% 40%, ${colors[2]} 40% 60%, ${colors[3]} 60% 80%, ${colors[4]} 80% 100%)`, // Áp dụng màu sắc cho vòng quay
          margin: "0 auto",
          transition: "transform 1s ease-out", // Mượt mà khi dừng lại
          position: "relative",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)", // Thêm bóng đổ cho vòng quay
          border: "5px solid #fff", // Thêm viền trắng cho vòng quay
        }}
      >
        {/* Các phần thưởng */}
        {prizes.map((prize, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `rotate(${
                index * anglePerPrize + 30
              }deg) translateY(-120px)`,
              transformOrigin: "0 100%",
              textAlign: "center",
            }}
          >
            <span
              style={{
                transform: `rotate(-${index * anglePerPrize}deg)`,
                fontSize: "20px",
                fontWeight: "bold",
                color: "#fff", // Màu chữ trắng để nổi bật
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)", // Thêm bóng đổ cho chữ
              }}
            >
              {prize}
            </span>
          </div>
        ))}
      </div>
      {/* Nút quay */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={spinWheel}
          disabled={spinning}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ff6347",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            transition: "background-color 0.3s ease",
          }}
        >
          {spinning ? "Đang quay..." : "Quay ngay!"}
        </button>
      </div>
      {/* Kết quả */}
      {result && (
        <div style={{ marginTop: "20px", fontSize: "1.5rem" }}>
          <p>
            Chúc mừng, bạn đã thắng: <strong>{result}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
