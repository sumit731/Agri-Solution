import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../Firebase";

export default function Test() {
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const saveData = async (userId) => {
    try {
      let data = {
        email,
        answers,
        createdAt: Timestamp.now(),
      };
      // to set the autoId of the document as per our need we will use setDoc
      await setDoc(doc(db, "Answers", userId), data);
      toast.success("Data saved successfully");
      toast.success("Zoom Link is Send within 24 hours");
      nav("/");
    } catch (err) {
      console.log(err);
      toast.error("Error saving data");
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        let userId = userCredentials.user.uid;
        saveData(userId);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleOptionChange = (question, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: option,
    }));
  };

  const questions = [
    {
      question:
        "1. What are the main challenges you face during planting and harvesting seasons?",
      options: [
        "Weather conditions",
        "Labor shortage",
        "Equipment failure",
        "Pest attacks",
        "Other",
      ],
    },
    {
      question:
        "2. What pests or diseases have affected your crops this year, and how have you managed them?",
      options: ["Aphids", "Fungal diseases", "Weeds", "Root rot", "Other"],
    },
    {
      question:
        "3. Do you have sufficient access to quality seeds, fertilizers, and other inputs?",
      options: ["Yes", "No", "Sometimes"],
    },
    {
      question:
        "4. How do you manage irrigation and water resources on your farm?",
      options: [
        "Drip irrigation",
        "Sprinkler systems",
        "Flood irrigation",
        "Rain-fed",
        "Other",
      ],
    },
    {
      question:
        "5. What are the primary health issues affecting your livestock, and what measures are you taking to address them?",
      options: [
        "Nutritional deficiencies",
        "Diseases",
        "Injuries",
        "Reproductive issues",
        "Other",
      ],
    },
    {
      question:
        "6. Are you satisfied with the current market prices for your produce or livestock?",
      options: ["Yes", "No", "Somewhat"],
    },
    {
      question:
        "7. What difficulties do you encounter in transporting your goods to the market?",
      options: [
        "Poor road conditions",
        "High transportation costs",
        "Lack of vehicles",
        "Distance to market",
        "Other",
      ],
    },
    {
      question:
        "8. How do environmental factors, such as weather and soil quality, impact your farming?",
      options: ["Severely", "Moderately", "Slightly", "Not at all"],
    },
    {
      question:
        "9. What kind of support or training would help you improve your farming practices?",
      options: [
        "Technical training",
        "Financial support",
        "Market access",
        "Equipment and tools",
        "Other",
      ],
    },
    {
      question:
        "10. Do you collaborate with other farmers or agricultural organizations for support and knowledge sharing?",
      options: ["Yes, frequently", "Yes, occasionally", "No"],
    },
  ];

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Question Form
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/">Pages</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div>
        <form onSubmit={handleForm} method="post">
          <div className="row g-3 justify-content-center">
            <h3 className="fs-15 fw-bold text-primary text-center">
              Email verification...
            </h3>
            <div className="col-sm-8">
              <div>
                <input
                  className="form-control mt-3 mb-3"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  className="form-control mb-5"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <h3 className="fs-15 fw-bold text-primary text-center mb-4">
                Questions...
              </h3>

              {questions.map((q, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h4>{q.question}</h4>
                  {q.options.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        className="form-check-input"
                        id={`${index}-${idx}`}
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleOptionChange(q.question, option)}
                      />
                      <label htmlFor={`${index}-${idx}`}>{option}</label>
                    </div>
                  ))}
                </div>
              ))}
              {/* <pre>{JSON.stringify(answers, null, 2)}</pre> */}
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-primary py-3 px-4" type="submit">
                Submit Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
