import '@progress/kendo-theme-default/dist/all.css';
import React, { useRef, useState }from 'react';
import { Button } from "@progress/kendo-react-buttons";
import { TextArea } from "@progress/kendo-react-inputs";
import { Splitter } from "@progress/kendo-react-layout";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Speech from 'react-speech';
import Index from './index.jpeg';
const primarybtnstyle = {
  color: "white",
  backgroundColor: "rgb(49, 49, 199)",
  borderRadius:30
};


function App() {
    const pdfExportComponent = React.useRef(null);

    const exportPDFWithMethod = () => {
      let element = document.getElementById("meetcontent");
      savePDF(element, {
        paperSize: "A4",
      });
    };
    const [panes, setPanes] = React.useState([
      {
        size: "30%",
        min: "80px",
        collapsible: true,
      },
      {
        min: "80px",
        collapsible: true,
      },
      {
        size: "30%",
        min: "80px",
        collapsible: true,
      },
    ]);
    
    
    const onChange = (event) => {
      setPanes(event.newState);
    };
    
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    
    const [value, setValue] = useState("");
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return (
        <div>
        Your browser does not Support Speech Recognition.
        </div>
      );
    }
    const handleListing = () => {
      setIsListening(true);
      SpeechRecognition.startListening({
        continuous: true,
      });
    
    };
    const stopHandle = () => {
      setIsListening(false);
      SpeechRecognition.stopListening();
    };
    const handleReset = () => {
      stopHandle();
      resetTranscript();
    };
    const resetdata = () => {
    setValue(" ");
  
      }

      const handleChange = (e) => {
        console.log(e.value);
        setValue(e.value);
      };
    
    return (
            <div>
                  <img src={Index} style={{display:"flex",margin:"auto"}} alt="meetdocs" />
                  <h3 style={{textAlign:"center"}}>MeetDocs</h3>
                  <p style={{textAlign:"center"}}>A meeting website that allows you to take voice notes and write text messages and convey them to others.</p>
                  <Splitter style={{height: 500}} panes={panes} onChange={onChange}>
                    <div style={{textAlign:"center"}} className="pane-content">
                      <h3 style={{textAlign:"center",color:"blue"}}>Add Voice Note/ Start Meeting Conversion to Text</h3>
                        
                      <TextArea rows={4} name="transcript"  value={transcript}/>
                      <br/>
                      <br/>
                      <Button primary={true} style={primarybtnstyle} look="outline"  onClick={handleListing}>Start Text Recognition</Button>
                        
                        {transcript && (
                        <div>
                            <Button primary={true} style={primarybtnstyle} look="outline" variant="success" onClick={handleReset}>
                            Reset the text
                            </Button>
                        </div>
                        )}
                        {isListening && (
                          <Button primary={true} style={primarybtnstyle} look="outline" onClick={stopHandle}>
                            Stop Text Recognition
                          </Button>
                        )}
                        <div>
                          {isListening ? "Listening........." : "Click to start Listening"}
                        
                        </div>
                    </div>
                    <div  style={{textAlign:"center"}} className="pane-content">
                        <PDFExport ref={pdfExportComponent} paperSize="A4">
                        <div  id="meetcontent" >
                          <h3 style={{textAlign:"center",color:"blue"}}>Voice Notes</h3>
                          {transcript} 
                        </div>
                        </PDFExport>
                        <Button primary={true} look="outline" onClick={exportPDFWithMethod}>Download Meeting Content</Button>
                        <br/>
                        <br/>
                    </div>
                    <div  style={{textAlign:"center"}} className="pane-content">
                      <h3 style={{textAlign:"center",color:"blue"}}>Chatbox for asking queries</h3>
                      <TextArea value={value} onChange={handleChange} rows={5}/>
                      <br/>
                      <br/>
                      <Speech textAsButton={true} displayText="Convert to speech" text={value}/>
                      <Button primary={false} look="outline" onClick={resetdata}>Clear Chatbox Text</Button>
                    </div>
                  </Splitter>
            </div>
          );
}

export default App;
