import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer mt-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-4">Our Office</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />1 Street, Ludhiana,
                Punjab
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +91 9876543285
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                ABC@example.com
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-twitter" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-youtube" />
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href=""
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-4">Services</h4>
              <span className="btn btn-link" >
                Landscaping
              </span>
              <span className="btn btn-link" >
                Pruning plants
              </span>
              <span className="btn btn-link" >
                Urban Gardening
              </span>
              <span className="btn btn-link" >
                Garden Maintenance
              </span>
              <span className="btn btn-link" >
                Green Technology
              </span>
            </div>
            {/* <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Quick Links</h4>
              <Link className="btn btn-link" to="/about">
                About Us
              </Link>
              <Link className="btn btn-link" to="/contact">
                Contact Us
              </Link>
              <Link className="btn btn-link" to="/services">
                Our Services
              </Link>
              <Link className="btn btn-link" href="">
                Terms &amp; Condition
              </Link>
              <Link className="btn btn-link" href="">
                Support
              </Link>
            </div> */}
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-4 h6">"Harness the power of technology and sustainable practices to grow smarter, healthier, and more profitable crops."</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid copyright py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              ©{" "}
              <a className="border-bottom" href="#">
                Agro-Solution
              </a>
              , All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
              Designed By{" "}
              <a className="border-bottom" href="">
                Sumit Prajapati
              </a>{" "}
              Distributed By <a href="">Agro-Solution</a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}
      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}
