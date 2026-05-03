import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);

      setTimeout(() => {
        setResult(res.data.image);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = "enhanced-image.jpg";
    link.click();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>✨ Photo Enhancer</h1>
        <p style={styles.subtitle}>
          Turn low-quality images into studio-quality product photos
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button onClick={uploadImage} style={styles.button}>
          {loading ? "Processing..." : "Enhance Image"}
        </button>

        <div style={styles.imageContainer}>
          {file && (
            <div style={styles.imageBox}>
              <p>Before</p>
              <img
                src={URL.createObjectURL(file)}
                style={styles.image}
                alt="before"
              />
            </div>
          )}

          {loading && file && (
            <div style={styles.imageBox}>
              <p>Processing</p>
              <img
                src={URL.createObjectURL(file)}
                style={{
                  ...styles.image,
                  filter: "blur(8px)",
                  opacity: 0.6,
                }}
                alt="loading"
              />
            </div>
          )}

          {result && !loading && (
            <div style={styles.imageBox}>
              <p>After</p>
              <img src={result} style={styles.image} alt="after" />

              <button style={styles.downloadBtn} onClick={downloadImage}>
                ⬇ Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: "10px",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    background: "#667eea",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  downloadBtn: {
    marginTop: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  imageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "130px",
    borderRadius: "10px",
  },
};

export default App;