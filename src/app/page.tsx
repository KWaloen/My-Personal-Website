import Introduction from './Introduction'
import React_Projects from './ReactProjects/React_Projects';
import Java_Projects from './JavaProjects/Java_Projects';
import Banner from './Banner';
import Footer from './Footer';
import SubBanner from './SubBanner';



export default function Home() {
  return (
    
      <div className="page">

        <Banner/>

        <SubBanner/>

        <Introduction/>
        
        <React_Projects/>
        
        <Java_Projects/>
        
        <Footer/>

        </div>

      );
}