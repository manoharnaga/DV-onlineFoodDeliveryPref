import React from 'react'
import AgeMealBarplot from './AgeMealBarplot'
import Sankey from './Sankey'
import Footer from './Footer'
import MapMeal from './MapMeal'
import OrderingSupport from './OrderingSupport'
import MapLocater from './MapLocater'
import MapDistribution from './MapDistribution'

export default function Home() {
    return (

        <>

            <div id="carouselMaterialStyle" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active img-div" data-mdb-interval="3000">
                        <img className='cover-image' src={require('../cover-image-2.jpg')} alt="Cover-1" />
                    </div>
                    <div className="carousel-item img-div" data-mdb-interval="3000">
                        <img className='cover-image' src={require('../cover-image-3.jpg')} alt="Cover-2" />
                    </div>
                    <div className="carousel-item img-div" data-mdb-interval="3000">
                        <img className='cover-image' src={require('../cover-image.jpg')} alt="Cover-3" />
                    </div>
                </div>

                {/* <img className='img-fluid cover-image' src={require('../cover-image.jpg')}></img> */}

            </div>

            <div className='container container-fluid heading-div' style={{ "marginTop": "5%", "height": "700px" }}>

                <div className="row">

                    <div className="col-7">

                        <div className="heading">
                            <h3 className='display-2 fw-bold'>Exploring Bangalore's Appetite</h3>

                            <p className='display-6 my-5'>
                                An Analysis of Food Ordering Habits, Delivery Preferences,
                                and Customer Satisfaction in the Silicon Valley of
                                India.</p>
                            <hr className='hr hr-blurry' />

                            <p className='mt-5 mb-1'>Team: Insight Imagers</p>
                            <p>Date: 15th April 2023</p>

                            {/* <p>Data: <span><a href='#'>Online Food Delivery Preferences....</a></span></p> */}
                        </div>
                    </div>

                    <div className="col-5" style={{ "paddingLeft": "10%" }}>

                        <img className='img-fluid' src={require('../food_delivery.gif')}></img>
                    </div>
                </div>


            </div>


            <div className='gray-bg'>
                <div className='container container-fluid' style={{ "height": "600px", "width": "45%" }}>

                    <div>

                        <h3 className='py-5 display-5'>Welcome to our Data Visualization Project </h3>
                        
                        <p className='fs-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}>Here, we take a deep dive into the online food ordering habits of Bangaloreans. Our analysis covers factors that drive customer satisfaction and loyalty, as well as the hotspots where most of the online food orders originate. </p>

                        <p className='fs-4'>With our project, you'll gain valuable insights into the food ordering behavior of Bangalore's diverse population and discover the city's unique culinary landscape. Join us on a journey to unleash the flavors of Bangalore and gain a new perspective on the city's vibrant food scene. </p>
                    </div>

                </div>

            </div>


            <AgeMealBarplot />
            <OrderingSupport />

            {/* <Sankey/> */}
            <MapDistribution />

            <MapLocater />


            <Footer />




        </>
    )
}
