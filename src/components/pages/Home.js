import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { ClipLoader } from "react-spinners";
export default function Home(){
  const[load,setLoad]=useState(true);
  const [toggle, setToggle] = useState();
  const [data,setData]=useState([])
  
    useEffect( ()=>{
        const qry= query(collection(db,"annoucements"),where("status","==",true)
      )
        onSnapshot(qry, doc=>{
            setData(doc.docs.map((el,index)=>{
                return(
                    {id:el.id, data:el.data()}
                )
            }))
        })
        setTimeout(()=>{
          setLoad(false)
        },1000)
    },[])
    const getDate=(date)=>{
      let date1=date.toDate().toString()
      let newDate=moment(date1).format("Do MMM, YYYY")
      return newDate
    }
  


    return(
        <>
  {/* Carousel Start */}
  <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
    <div
      id="header-carousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="w-100" src="/assets/img/carousel-1.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h1 className="display-1 text-white mb-5 animated slideInDown">
                    Make Your Home Like Garden
                  </h1>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="w-100" src="/assets/img/carousel-2.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <h1 className="display-1 text-white mb-5 animated slideInDown">
                    Create Your Own Small Garden At Home
                  </h1>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  {/* Carousel End */}
  <ClipLoader
                        cssOverride={{ display: "block", margin: "10vh auto" }}
                        loading={load}
                    />
                      {!load && (
  <div className="container-xxl py-5 my-4">
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 500 }}
      >
        <h1 className="display-5 mb-5">
            Annoucements
        </h1>
      </div>
      <div className="row g-4">

      {data.length > 0 ? (
              data.map((el, index) => (
                <div className="col-lg-4 col-md-12 wow  fadeInUp" data-wow-delay="0.1s" >
                <div className="team-item rounded">
                  <img className="img-fluid" src={el?.data?.image} alt="" style={{height:"400px"}} />
                  <div className="team-text">
                    <h4 className="mb-0">{el?.data?.title}</h4>
                    <p className="text-primary">{el?.data?.description}</p>
                  </div>
                </div>
              </div>
            ))

        ) : (
          <h1 colSpan={6} className="text-center">No data found</h1>
        )}
     
    

      </div>
    </div>
  </div>
                      )}
  {/* Top Feature Start */}
 
  {/* Top Feature End */}

  {/* About Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5 align-items-end">
        <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
          <img
            className="img-fluid rounded"
            data-wow-delay="0.1s"
            src="/assets/img/about.jpg"
          />
        </div>
        <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
          <h1 className="display-1 text-primary mb-0">25</h1>
          <p className="text-primary mb-4">Year of Experience</p>
          <h1 className="display-5 mb-4">Empowering Farmers with Innovative Agro Solutions</h1>
          {/* <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p> */}
          {/* <a className="btn btn-primary py-3 px-4" href="">
            Explore More
          </a> */}
        </div>
        <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
          <div className="row g-5">
            <div className="col-12 col-sm-6 col-lg-12">
              <div className="border-start ps-4">
                <i className="fa fa-award fa-3x text-primary mb-3" />
                <h4 className="mb-3">Award Winning</h4>
                {/* <span>
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                  justo magna
                </span> */}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-12">
              <div className="border-start ps-4">
                <i className="fa fa-users fa-3x text-primary mb-3" />
                <h4 className="mb-3">Dedicated Team</h4>
                {/* <span>
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                  justo magna
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
  {/* Facts Start */}
  <div
    className="container-fluid facts my-5 py-5"
    data-parallax="scroll"
    data-image-src="/assets/img/carousel-1.jpg"
  >
    <div className="container py-5">
      <div className="row g-5">
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.1s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            1234
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Happy Clients</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.3s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            1234
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Garden Complated</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.5s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            1234
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Dedicated Staff</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.7s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            1234
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Awards Achieved</span>
        </div>
      </div>
    </div>
  </div>
  {/* Facts End */}
  {/* Features Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <p className="fs-5 fw-bold text-primary">Why Choosing Us!</p>
          <h1 className="display-5 mb-4">
            Few Reasons Why People Choosing Us!
          </h1>
          {/* <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p> */}
          <a className="btn btn-primary py-3 px-4" href="">
            Explore More
          </a>
        </div>
        <div className="col-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className="row g-4">
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div
                    className="text-center rounded py-5 px-4"
                    style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
                  >
                    <div
                      className="btn-square bg-light rounded-circle mx-auto mb-4"
                      style={{ width: 90, height: 90 }}
                    >
                      <i className="fa fa-check fa-3x text-primary" />
                    </div>
                    <h4 className="mb-0">100% Satisfaction</h4>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                  <div
                    className="text-center rounded py-5 px-4"
                    style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
                  >
                    <div
                      className="btn-square bg-light rounded-circle mx-auto mb-4"
                      style={{ width: 90, height: 90 }}
                    >
                      <i className="fa fa-users fa-3x text-primary" />
                    </div>
                    <h4 className="mb-0">Dedicated Team</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
              <div
                className="text-center rounded py-5 px-4"
                style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
              >
                <div
                  className="btn-square bg-light rounded-circle mx-auto mb-4"
                  style={{ width: 90, height: 90 }}
                >
                  <i className="fa fa-tools fa-3x text-primary" />
                </div>
                <h4 className="mb-0">Modern Equipment</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Features End */}


</>

    )
}