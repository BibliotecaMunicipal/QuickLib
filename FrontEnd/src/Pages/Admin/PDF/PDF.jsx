
import PdfCard from "./pdfcard";

    function App() {
      const cards = {  maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "1rem", padding : '20px', gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}
      return (
        <div >
          <h2 style={{textAlign:'center'}}>E  S  T  A  D  I  S  T  I  C  A</h2>
          <div style={cards}>
            <PdfCard title="ESTADISTICA"/>
            {/* <PdfCard title="INFORME"/> */}
          </div>
        </div>
      );
    }
 
    export default App;