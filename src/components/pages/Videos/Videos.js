import VideoCard from "./VideoCard";

export default function Videos() {
  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Video Solutions
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="javascript:void(0);">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container-xxl py-3">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 500 }}
          >
            <p className="fs-5 fw-bold text-primary">Video Solutions</p>
            <h1 className="display-5 mb-1">
              Video to Solve your Problem Quickly
            </h1>
          </div>
          <div className="row py-5">
            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/0VAkCm7iKJE"
                title="Kibertopiks #4269"
                description="Grow vegetables without land and earn up to 5 times."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/f8jiVotakgE?si=FjVUekpSSh4sCi5u"
                title="BUSINESS MODEL"
                description="IIT engineer created Business model. AQUAPONICS FISH FARMING."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/Fw1SQSek5rk?si=GZrCI_ZCJYfD7rAc"
                title="PM-KUSUM yojana"
                description="The first farmer Under PM-KUSUM yojana now earns 4 lakh per month."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/VjuUO25VLLE?si=lXIExIIn-9YH3hkH"
                title="Business Ideas"
                description="Most Profitable Agriculture Business in India."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/zMZ6IBCQCm8?si=zzCvi-YIUqXACTsH"
                title="Beekeeping"
                description="How to Earn Money from Beekeeping."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/9_Q4RBTd3ws?si=v7A4OI5rh2g0wq3w"
                title="Business Ideas"
                description="Best Business Ideas in Agriculture Sector With Full Case Study."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/hyrJlE015dA?si=yKg8rtx7GlHvn_dR"
                title="Sustainable Farming"
                description="Sustainable Farming: Techniques for a Greener Future."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>

            <div className="col-3 my-3">
              <VideoCard
                videoUrl="https://www.youtube.com/embed/c5pekMjAapo?si=9P0DpIxd8VIL0HFP"
                title="Multilayer Farming"
                description="How multilayer farming made this farm profitable."
                uploadTime="11 days ago"
                views="1.2K"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
