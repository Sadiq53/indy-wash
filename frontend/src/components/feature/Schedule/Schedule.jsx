import { useEffect } from 'react';

const Schedule = () => {
    useEffect(() => {
        // Dynamically load the external script
        const script = document.createElement("script");
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          // Clean up the script when the component unmounts
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <iframe
        className='p-0'
          src="https://api.leadconnectorhq.com/widget/booking/SysY8UteId3o59W40uQC"
          style={{ width: "100%", border: "none", overflow: "hidden" }}
          scrolling="no"
          id="SysY8UteId3o59W40uQC_1734801608340"
          title="Booking Widget"
        ></iframe>
      );
    
}

export default Schedule