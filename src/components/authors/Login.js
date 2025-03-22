import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredentials.user.uid;
      const docRef = doc(db, "users", userId);
      const dataDoc = await getDoc(docRef);

      if (dataDoc.exists()) {
        const data = dataDoc.data();
        if (data.status) {
          console.log(data);
          sessionStorage.setItem("userId", data.userId);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("userType", data.userType);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("city", data.city);
          sessionStorage.setItem("address", data.address);
          sessionStorage.setItem("contact", data.contact);
          toast.success("Login successfully");
          if (data.userType == 1) {
            setTimeout(() => {
              navigate("/AdminMaster");
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        } else {
          toast.error("Account Blocked!! Kindly contact admin.");
          setLoading(false);
        }
      } else {
        toast.error("No user found!! Try again");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Sign In Page
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
                Login
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <ClipLoader cssOverride={{ display: "block", margin: "10vh auto" }} loading={loading} />

      {!loading && (
        <div className="container-fluid py-5">
          <div className="container">
            <div
              className="text-center mx-auto wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ maxWidth: 500 }}
            ></div>
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div
                  className="bg-light rounded p-4 p-sm-5 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <form onSubmit={handleForm} method="post">
                    <div className="row g-3">
                      <h1 className="fs-15 fw-bold text-primary text-center">
                        Login
                      </h1>
                      <div className="col-sm-12">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control border-0"
                            id="gmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email or Username..."
                            required
                          />
                          <label htmlFor="gmail">Enter Email or Username...</label>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control border-0"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password..."
                            required
                          />
                          <label htmlFor="password">Enter Password...</label>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <button className="btn btn-primary py-3 px-4" type="submit">
                          Submit Now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
