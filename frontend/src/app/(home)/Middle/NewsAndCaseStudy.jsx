
import img1 from "../../../../public/img/hpower1.jpg"
import img2 from "../../../../public/img/hpower2.jpg"
import img3 from "../../../../public/img/hydroportrait.jpg"
import Image from "next/image";
import Link from "next/link";
import bimg1 from "../../../../public/img/blog/blog1.jpg"
import bimg2 from "../../../../public/img/blog/blog2.png"



// Individual Card Component
const CaseStudyCard = ({ study }) => {
    return (
        <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="w-full h-auto overflow-hidden p-4">
                <Image
                width={300}
                height={300}
            // <img  src={`${BASE_CONTENT}/${member.image.replace(/\\/g, '/')}`}  className="team-img" />

                   src={study.img}
                    alt={study.title}
                    className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                    // Fallback placeholder image on error\
                    unoptimized
                   
                />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                   {study.title}
                </h3>
                <div className="text-base multiline-ellipsis text-gray-600 mb-4 flex-grow">
                                        {study?.desc} 

                </div>
                <Link href={`/blog/${study.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                    Read more
                </Link>
            </div>
        </div>
    );
};

// Main App Component
export default async function  NewsAndCaseStudy() {

  let data =  [
 
    {
      title:"Laxmi Sunrise Bank-led consortium to invest in 70 MW Dudhkoshi 2",
      desc:`The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost of Rs 15 billion. “This venture will play a crucial role in Nepal's renewable energy landscape,” reads a LSBL-issued press statement.  

      <br>
      <br>
      <br>
      KATHMANDU, Sept 25: The 70 MW Dudhkoshi 2 (Jaleshwor) Hydropower Project has accomplished its financial closure with a consortium of banks led by Laxmi Sunrise Bank Limited (LSBL) signing an agreement with its promoter Dudh Koshi Hydropower Nepal Pvt Ltd.


<br>
The project is being constructed at the Dudhkoshi River of the Solukhumbu district with an estimated project cost of Rs 15 billion. “This venture will play a crucial role in Nepal's renewable energy landscape,” reads a LSBL-issued press statement.  
<br>
<br>
The banking consortium has committed to financing approximately 70 percent of the project cost, with the remaining 30 percent to be contributed by the project promoters and the public. The consortium comprises LSBL as the lead, Everest Bank as the co-lead and Sanima Bank as the member. Collectively, the total term loan amounts to Rs 10.5 billion.
<br><br>

The Dudhkoshi 2 (Jaleshwor) Hydropower Project had received the generation license from the Department of Electricity Development on September 23, 2020 and subsequently signed the power purchase agreement with Nepal Electricity Authority on November 22, 2021. The company is being promoted by Aayu Malun Hydropower Ltd, several prominent individual stakeholders and various private equity and venture capital.
<br><br><br>

Dudhkoshi 2 (Jaleshwor) Hydropower Project is anticipated to generate an estimated 417 GWh of power annually to the national grid and will be one of the large sized independent power producers (IPP) when it comes into operation by July 2029.
<br>

`,
id:1,
img:bimg1
    },
 
    {
      title:"दूधकोशी–२ आयोजनाको क्षमता बढेर पुग्यो ९६ मेगावाट, लागत पनि थपियो",
      desc:`काठमाडौँ। निजी लगानीमा निर्माण सुरु भएको दूधकोशी–२ अर्धजलासय जलविद्युत आयोजनाको क्षमता बढेर ९५.७ मेगावाट पुगेको छ। यसअघि ७० मेगावाटमा आयोजना डिजाइन गरिएको थियो।

दुधकोसी नदीमा पानीको वहाव पहिला अध्ययन गरेको भन्दा बढी देखिएपछि आयोजनाको क्षमता बढेको हो। यसअघि दूधकोसीमा पानीको वहाव प्रतिसेकेन्ड ६२ घनमिटरका आधारमा आयोजनाको डिजाइन ७० मेगावाट गरिएको थियो।

पछिल्लो अध्ययनले पानीको बहाव प्रतिसेकेन्ड साढे ८३ घनमिटर आएपछि आयोजनाको जडित क्षमता बढेको आयोजना विकासकर्ता दूधकोशी हाइड्रोपावर नेपाल प्रालिका अध्यक्ष कदम केसीले बताए। जडित क्षमता बढाउनका लागि कम्पनीले विद्युत विकास विभागमा आवेदन दिएको उनले जनाएका दिए।
<br>

विभागको स्वीकृतिपछि नेपाल विद्युत प्राधिकरणसँग थप २५.७ मेगावाट विद्युत खरिद सम्झौता (पीपीए) हुने उनले सुनाए। यस्तै जडित क्षमता वृद्धिसँगै आयोजनाको लाग पनि बढेर २० अर्ब रुपैयाँ पुग्ने अध्यक्ष केसीले बताए। यसअघि आयोजनाको लागत १५ अर्ब रुपैयाँ अनुमान गरिएको थियो। आयोजनामा संस्थापकले स्वपुँजी (इक्विटी) र बैंकले पनि ऋण थप्नु पर्ने भएको छ।

<br>
आयोजनामा लक्ष्मी सनराइज बैंकको अगुवाईमा एभरेष्ट बैंक र सानिमा बैंकले आयोजनामा साढे १० अर्ब रुपैयाँ ऋण लगानी गर्ने भएको छन्। आयोजनामा बैंकहरुले थप लगानी गर्ने भएका छन्।
आयोजना बनाउन नसकेपछि भारतीय कम्पनी आफ्नो स्वामित्व नेपालीलाई बिक्री गरेर आयोजनाबाट बाहिरिएको छ।

आयोजनाको कुल अनुमानित लागतको ७० इक्विटी हुने गरी लगानी संरचना बनाइएको छ। जसअनुसार १० अर्ब ५० करोड रुपैयाँ बैंकको ऋण र बाँकी साढे चार अर्ब रुपैयाँ संस्थापकहरूको स्वपुँजी लगानी हुने गरी ऋण सम्झौता भएको छ। काम सुरु गरेको चार वर्षमा सम्पन्न हुने कम्पनीका अध्यक्ष केसीले जानकारी दिए।

विद्युत प्राधिकरणसँग २०२१ नोभेम्बरमा आयोजनाबाट उत्पादन हुने बिजुली पीपीए भएको थियो। वर्षायाममा (जुनदेखि नोभेम्बर) सम्म प्रतियुनिट ४.८० रुपैयाँ र सुक्खा मौसममा (डिसेम्बरदेखि मे महिना) सम्म ८.४० रुपैयाँ रहेको छ।

<br>
आयोजनाबाट वार्षिक ४१ करोड ७४ लाख युनिट बिजुली उत्पादन हुने अध्ययनले देखाएको छ। क्षमता बढेकाले ऊर्जा उत्पादन पनि थपिने भएको छ। आयोजनाको प्रतिमेगावाट लागत २१ करोड ४३ लाख रुपैयाँ छ। आयोजनाको प्रतिफल १३.९७ प्रतिशत रहेको छ। इक्विटीमा प्रतिफल २१ प्रतिशत रहेको छ। आयोजनाले १२ वर्षमा ऋण चुक्ता गर्ने भएको छ। कम्पनीले बिजुली बेचेर औसत ५.९६ रुपैयाँ पाउने भएको छ।

परियोजनाबाट उत्पादित बिजुली १२ किलोमिटर लामो १३२ केभी प्रसारण लाइनमार्फत पहिले नै सञ्चालनमा रहेको विद्युत प्राधिकरणको टिङ्ला सबस्टेशनमा जोड्ने प्रस्ताव गरिएको छ। ३५ मेगावाट क्षमताका दुई टवाईन जडान हुने भएको कम्पनीले जनाएको छ।

दूधकोशी–२ लाई जुट्यो लगानी, लक्ष्मी सनराइज बैंकको अगुवाईमा साढे १० अर्ब ऋण

दूधकोशी हाइड्रोपावर सन् २०१३ अक्टुबरमा स्थापना भएको हो। आयोजनाको डिजाइन डिस्चार्ज ६२.३० प्रतिसकेन्ड रहेको छ। क्यू ४० मा आयोजना डिजाइन गरिएको छ । सोलुखुम्बुको थुलुङ दूधकोशी गाउँपालिकामा पर्ने दूधकोशी नदीमा विद्युत उत्पादनको लागि विद्युत विकास विभागबाट २०७७ असोजमा इजाजतपत्र (लाइसेन्स) पाएको थियो।
<br>
यसअघि आयोजना सोलुखुम्बुमा थुलुङ दूधकोशीमा बाँध बनाइ सुरुङमार्गबाट खोटाङको ऐसेलुखर्क गाउँपालिकाको जलेश्वरीमा विद्युतगृह निर्माण गरी २३० मेगावाट उत्पादन गर्ने अनुमानसहित प्रक्रिया अगाडि बढाइएको थियो।

यसअघि दूधकोशीको पानी करिब पाँच किलोमिटर सुरुङ मार्गमार्फत पुर्याउने योजना थियो। अहिले तीन किलोमिटर सुरुङमार्गमार्फत खन्याखर्कमा निर्माण हुने विद्युतगृहमा पुर्याइने भएको छ। जसकारण उत्पादन क्षमतासमेत २३० मेगावाटबाट घटेर ७० मेगावाटमा झरेको कम्पनीले जनाएको छ। अब फेरी बढेर ९६ मेगावाट पुग्नेछ।

आयोजनाको नेतृत्व कदम केसीले गरेका छन्। यस्तै सञ्चालकहरुमा अभिज्ञा मल्ल, विक्रम गौतम, अरुण अग्रवाल, किरण मल्ल र हिमाल भट्टराई रहेका छन्। प्रमुख संस्थागत लगानीकर्ताहरूमा आयु मालुन हाइड्रोपावर लिमिटेड, टिम भेन्चर, सारथी इक्विटी फन्ड रहेका छन्।

`,
id:2,
img:bimg2
    },
 

  ]

      

  return (
    <div data-aos="fade-up"  className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-[Inter]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>

        {/* Responsive Grid Container */}
        <div  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data?.splice(0, 3).map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
      </div>
    </div>
  );
}