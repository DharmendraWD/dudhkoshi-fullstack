

import React from 'react';

import Image from 'next/image';
import map from "../../../public/img/map.png"
import elec from "../../../public/img/electric.png"

import img2 from "../../../public/img/proj/28.png";

const Card = ({ children, className }) => (
  <div
    className={` p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const ClientCarousel = async () => {

 

  return (

    <div className=" max-w-[1440px] pt-4  mx-auto bg-white"id='about-us'>

        <div className="relative flex items-center justify-centeroverflow-hidden bg-white font-[Inter]">
            

  
            <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">

          
                <div data-aos="zoom-out-up" className="flex justify-center">
                    <button className="px-6 py-2 bg-white text-gray-900 font-medium text-xl rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-gray-800  border border-gray-200">
                    About Us
                    </button>
                </div>
                


                <p data-aos="zoom-out-up" className="text-l pb-8 sm:text-xl text-gray-700 text-start leading-relaxed max-w-[100%] mx-auto mt-4 border-blue-600 pt-4">
          Dudhkoshi Hydropower Nepal Pvt. Ltd., established in 2070 B.S. and headquartered in Anamnagar, Kathmandu, is a dedicated hydropower development company committed to advancing Nepal’s clean and sustainable energy future. The company is developing the Dudhkoshi-2 (Jaleshwor) Hydropower Project, a <span className='font-semibold'>95.7 MW</span> optimized Peaking Run-of-River (PROR) project located on the Dudhkoshi River in Thulung Dudhkoshi, Solukhumbu District of Koshi Province. Backed by an experienced leadership team and strong institutional partners, the project is strategically designed on solid bedrock with robust geological conditions and reliable access, and is positioned to make a significant contribution to national power supply while supporting long-term economic and energy security in Nepal.
                </p>
                
            </div>
        </div>




      <div className="grid gap-6 lg:grid-cols-3  lg:h-[350px]" >

      

        {/* <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">

           <Image
                height={300}
                width={300}
              
          unoptimized
                    src={img1.src} 
                    alt="Aerial view of the reservoir water"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
        </div> */}

        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-full">
            <div data-aos="zoom-out-up" className="flex h-full ">
                <Image 
                width={300}
                height={300}
      unoptimized
                    src={img2}
                    alt="Side view of the hydropower dam structure"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
             
            </div>
          </div>
        </div>

        <Card className="bg-[var(--primary1)] text-gray-800 lg:col-span-1 lg:row-span-1 border border-gray-100 h-full">
          <h3  data-aos="zoom-out-up" className="text-l font-semibold mb-4 text-gray-300 opacity-75">{"Foundation"}</h3>
          <p  data-aos="zoom-out-up" className="leading-relaxed text-white ">
         Our company stands on a strong foundation of transparency, accountability, and ethical hydropower development, ensuring every project is planned and executed with integrity. Backed by experienced engineers, consultants, and industry experts, our foundation is shaped by precision, innovation, and proven hydropower expertise.We are grounded in the belief that hydropower should benefit both people and the planet driving clean energy, empowering communities, and supporting Nepal’s sustainable future.
          </p>
        
        
        </Card>

    
        <Card data-aos="zoom-out-up" className="bg-[var(--primary1)] text-white lg:col-span-1 lg:row-span-1 h-full relative overflow-hidden flex flex-col justify-between">
   <div className='flex md:flex-row flex-col  justify-between'>
    <div data-aos="zoom-out-up">
           <h3 className="text-l font-semibold opacity-75">Capacity</h3>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative text-xl font-extrabold">97.5MW</div>
      
          </div>
          <p   className="mt-4 overflow-auto my-scroll text-l leading-relaxed max-w-[100%] lg:max-w-xs">
           The Dudhkoshi-2 (Jaleswar) Hydroelectric Project is designed as a 95.7 MW peaking run-of-river (PRoR) hydropower project optimized to meet Nepal’s growing demand for reliable and sustainable energy. The project uses a design discharge of 83.5 m³/s and a gross head of 144.5 meters, enabling high-efficiency power generation even during dry seasons. 
          </p>
          
   </div>
   <Image  src={elec} width={200} className='w-[20%]' height={200}   alt="map" />
   </div>
        </Card>
      </div>

                      <Card className="bg-[var(--primary2)] mt-8 mb-4  text-white lg:col-span-2 lg:row-span-1 h-full relative overflow-hidden">
          <div className='flex md:flex-row flex-col items-center justify-between'>
     <div className='w-[90%]' >
           <h3 className="text-xl font-bold mb-4 opacity-75 text-gray-100">Where we Operate</h3>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           
            <div className="absolute inset-0 bg-repeat [background-image:radial-gradient(currentColor_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10">
            <p data-aos="zoom-out-up" className="text-lg leading-relaxed max-w-2x text-gray-100 ">
             Dudhkoshi Hydropower Nepal Pvt. Ltd. operates in one of Nepal’s most promising hydropower regions — Solukhumbu District, located in Koshi Province. Our primary operational focus is the development of the Dudhkoshi-2 (Jaleswar) Hydroelectric Project, a 95.7 MW run-of-river project strategically positioned along the Dudhkoshi River.
            </p>
      
           
            <div className="absolute right-[10%] top-[40%] bg-white w-2 h-2 rounded-full border-2 border-opacity-70 border-white shadow-xl"></div>
          </div>
       </div>
          <Image data-aos="zoom-out-up" src={map.src} width={200} className='w-[100%]' height={200}   alt="map" />  
          

     </div>
        </Card>
    </div>
  );
};

export default ClientCarousel;