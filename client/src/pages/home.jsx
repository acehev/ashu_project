function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "48px", color: "#2563eb" }}>
        Find Your Dream Job 💼
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "gray",
          marginTop: "20px",
        }}
      >
        Explore thousands of jobs from top companies.
      </p>

      <button
        style={{
          marginTop: "30px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Browse Jobs
      </button>
    </div>
  );
}

export default Home;