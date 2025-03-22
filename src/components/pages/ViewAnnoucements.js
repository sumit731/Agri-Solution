import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { db } from "../../Firebase";
import { ClipLoader } from "react-spinners";
export default function Annoucememts(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
  
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
  {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-3 text-white mb-4 animated slideInDown">
        Daily Annoucements
      </h1>
      <nav aria-label="breadcrumb animaated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
             Annoucements
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}


  {/* Team Start */}
  <ClipLoader
                        cssOverride={{ display: "block", margin: "10vh auto" }}
                        loading={load}
                    />
                      {!load && (
  <div className="container-xxl py-5">
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
  {/* Team End */}
  </>
    )
}