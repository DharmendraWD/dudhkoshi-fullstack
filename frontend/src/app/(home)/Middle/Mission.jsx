
import { motion } from "framer-motion";
import MissionClient from "./MissionClient";


// Fallback data in case API fails
const fallbackData = {
  heading: "Mission & Strategy",
  shortpara: "Deliver reliable renewable energy through sustainable hydropower development for Nepal's future growth.",
  firstCardHeading: "Deliver Sustainable Clean Energy",
  firstCardPara: "To develop reliable hydropower projects that contribute to Nepal's long-term energy security while promoting clean, renewable, and environmentally responsible power generation.",
  secCardHeading: "Empower Communities & Create Value",
  secCardPara: "To support local employment, uplift surrounding communities, and create long-term economic value for stakeholders, partners, and the nation.",
  thirdCardHeading: "Build with Excellence & Innovation",
  thirdCardPara: "To adopt modern engineering practices, advanced technologies, and international standards to ensure safe, efficient, and cost-effective project development from design to operation."
};




const ModernMissionSection = async () => {


  // Fetch mission data textual only
  const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
    const fetchMissionData = async () => {
      
      try {
        // Fetch text data
        const textResponse = await fetch(`${BASE_API}/contents/mission`, {
          cache: 'no-cache',
        });

        if (textResponse.ok) {
          const textData = await textResponse.json();
          if (textData.success && textData.data) {
            return textData.data[0] || fallbackData;
          }
        }
      } catch (err) {
        console.error('Failed to fetch mission data:', err);
      } finally {
      }
    };

    const fetchMissionImages = async () => {
        const imageResponse = await fetch(`${BASE_API}/contents/missionimg`, {
          cache: 'no-cache',
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          if (imageData.success && imageData.data) {
            const apiImages = imageData.data;
            return apiImages;
          }
        }

    }
  

    const mvvDataDynamic = await fetchMissionData();
    const images = await fetchMissionImages();


  return (
    
<>


<MissionClient mvvDataDynamic={mvvDataDynamic} images={images} ></MissionClient>
</>
  );
};

export default ModernMissionSection;