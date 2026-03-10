import TeamProfileClient from "./TeamProfileClient";

// Fallback team data in case API fails
const fallbackTeamMembers = [
  {
    id: 1,
    name: "Kadam KC",
    title: "CHAIRMAN",
    bio: `Background in Env. Science & Geotechnical Eng (UK). Entrepreneur in Hydropower & Construction. MD of Puwa Khola-1 (4MW), Aayu Malun (21MW), Upper Tamor A (60MW).`,
    profileImage: "/img/testimonial/1.jpg",
    thumbnailImage: "/img/testimonial/1.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 2,
    name: "Arun Kumar Agarwal",
    title: "Director",
    bio: `A leading businessman in the construction and infrastructure sector, with extensive experience driving growth across multiple enterprises. He leads Rajesh Trade Link, RTL Mall, and Goyal Aluminum, overseeing operations supported by a strong nationwide distribution network. His leadership focuses on strategic expansion, operational excellence, and building scalable businesses that deliver consistent quality, market reach, and long-term value across the construction and infrastructure ecosystem.`,
    profileImage: "/img/testimonial/2.jpg",
    thumbnailImage: "/img/testimonial/2.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 3,
    name: "Bikram Gautam",
    title: "Director",
    bio: `With over 15 years of experience leading large-scale manufacturing and construction teams, He brings deep expertise in the Real Estate and Mines business sectors. He has a strong track record in end-to-end product development, operational leadership, and project execution. His experience includes strategic planning, cross-functional team management, process optimization, and delivering high-quality, cost-effective solutions that drive sustainable business growth and long-term value.`,
    profileImage: "/img/testimonial/3.jpg",
    thumbnailImage: "/img/testimonial/3.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 4,
    name: "Abhigya Malla",
    title: "Director",
    bio: `Holds Masters in Professional Accountancy and Commerce in Finance (Macquarie University, Australia). Vice President/Finance Controller at High Himalaya Hydro Construction Pvt. Ltd. Project developer and youth contractor, involved in Aayu Malun - 21 MW, Puwa Khola - 4 MW, Hongu Khola - 28.9 MW, Midim Khola - 3 MW, and Upper Tamor A - 60 MW. Managing Director of Union Hydropower Public Ltd.`,
    profileImage: "/img/testimonial/4.jpg",
    thumbnailImage: "/img/testimonial/4.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
  {
    id: 5,
    name: "Devendra Adhikari",
    title: "Director",
    bio: `A seasoned entrepreneur with 30+ years of experience in trading, export, agriculture, and real estate; former Director of Lumbini Finance and Lumbini Bikash Bank; active capital market investor and real estate developer`,
    profileImage: "/img/testimonial/deve.jpeg",
    thumbnailImage: "/img/testimonial/deve.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },
];

export default async function TeamProfile() {
  // const [teamMembers, setTeamMembers] = useState(fallbackTeamMembers);
  let teamMembers = fallbackTeamMembers;
  let active = null;

  



      try {
        const BASE_API = process.env.BASE_API || 'http://localhost:4000/api';
        const BASE_CONTENT_URL = process.env.BASE_CONTENT_URL || 'http://localhost:4000/';
        
        const response = await fetch(`${BASE_API}/contents/team`, {
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
          // Transform API data to match our component structure
          const apiTeamMembers = data.data.map((member, index) => ({
            id: member.id || index + 1,
            name: member.name || `Team Member ${index + 1}`,
            title: member.designation || "Team Member",
            bio: member.description || "Description not available",
            profileImage: member.dp 
              ? `${BASE_CONTENT_URL}uploads/team/${member.dp}`
              : `/img/testimonial/${(index % 5) + 1}.jpg`,
            thumbnailImage: member.dp 
              ? `${BASE_CONTENT_URL}uploads/team/${member.dp}`
              : `/img/testimonial/${(index % 5) + 1}.jpg`,
            social: {
              linkedin: "#",
              twitter: "#",
              instagram: "#",
              youtube: "#",
            }
          }));
          teamMembers = apiTeamMembers;
          active = apiTeamMembers[0].id;
        } else {
     teamMembers = fallbackTeamMembers;
          active = fallbackTeamMembers[0].id;
        }
      } catch (err) {
        console.error('Failed to fetch team data:', err);
        teamMembers = fallbackTeamMembers;
        active = fallbackTeamMembers[0].id;
      } finally {
    
      }

      return (
        <>
        <TeamProfileClient teamMembers={teamMembers} active={active} />
       </>
      );




}