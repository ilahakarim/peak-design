import { useState } from "react";
import { Link } from "react-router";

const Footer = () => {
  // İstifadəçinin yazdığı email
  const [email, setEmail] = useState("");
  // Xəta mesajı (yoxdursa boş string)
  const [error, setError] = useState("");
  // Uğurla abunə olundumu?
  const [success, setSuccess] = useState(false);

  function handleSubscribe() {
    // Sadə yoxlama: email boşdursa
    if (!email) {
      setError("Please enter your email");
      setSuccess(false);
      return;
    }

    // Email formatını yoxlayır: adisomething@adisomething.adi
    // (məsələn ali@gmail.com düzgündür, i@. düzgün deyil)
    const isValid = /^\S+@\S+\.\S+$/.test(email);

    if (!isValid) {
      setError("Please enter a valid email");
      setSuccess(false);
      return;
    }

    // Hər şey doğrudursa
    setError("");
    setSuccess(true);
    setEmail("");
  }

  return (
    <footer className="w-full bg-white text-[#1d2522] border-t border-gray-200 px-6 sm:px-8 md:px-12 lg:px-16">

      {/* STORE */}
      <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight pt-16 md:pt-20">
        VISIT A PD STORE
      </h2>

      <div className="flex flex-wrap items-center gap-5 md:gap-6 mt-7 text-[16px]">
        <Link to="/store/sf" className="hover:underline">SF</Link>
        <span>|</span>
        <Link to="/store/la" className="hover:underline">LA</Link>
        <span>|</span>
        <Link to="/store/ny" className="hover:underline">NY</Link>
        <span>|</span>
        <Link to="/store/pdx" className="hover:underline">PDX</Link>
        <span>|</span>
        <Link to="/store/tk" className="hover:underline">TK</Link>
        <span>|</span>
        <Link to="/store/cz" className="hover:underline">CZ</Link>
      </div>

      {/* NEWSLETTER */}
      <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight mt-16 md:mt-20">
        SUBSCRIBE TO NEWSLETTER
      </h2>

      <p className="mt-10 text-[17px] md:text-[18px]">
        Be the first to know about new products, events, and sales.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="h-[48px] md:h-[50px] w-full border border-gray-300 px-4 text-[17px] outline-none focus:border-gray-500"
          />

          {error && <p className="text-red-500 text-[13px] mt-2">{error}</p>}
          {success && <p className="text-green-600 text-[13px] mt-2">Subscribed! Thank you.</p>}
        </div>

        <button
          onClick={handleSubscribe}
          className="h-[48px] md:h-[50px] bg-[#17201d] text-white px-7 text-[15px] font-semibold rounded-[4px] hover:opacity-90 transition cursor-pointer"
        >
          SIGN ME UP
        </button>
      </div>

      {/* LINKS */}
      <div className="mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">

        <div>
          <h3 className="text-[24px] md:text-[27px] font-medium mb-7">ABOUT</h3>
          <div className="flex flex-col gap-4 text-[16px]">
            <Link to="/mission" className="hover:underline">Our Mission</Link>
            <Link to="/info/careers" className="hover:underline">Careers</Link>
            <Link to="/info/retail-store" className="hover:underline">Find a Retail Store</Link>
            <Link to="/impact-report" className="hover:underline">Impact Report</Link>
            <Link to="/info/taking-action" className="hover:underline">Taking Action</Link>
            <Link to="/info/field-notes" className="hover:underline">Field Notes</Link>
            <Link to="/info/ambassadors" className="hover:underline">Ambassadors</Link>
            <Link to="/films" className="hover:underline">Films</Link>
            <Link to="/info/collaborate" className="hover:underline">Collaborate With Us</Link>
            <Link to="/info/become-dealer" className="hover:underline">Become a Dealer</Link>
            <Link to="/info/find-your-peak" className="hover:underline">#FindYourPeak</Link>
          </div>
        </div>

        <div>
          <h3 className="text-[24px] md:text-[27px] font-medium mb-7">SUPPORT</h3>
          <div className="flex flex-col gap-4 text-[16px]">
            <Link to="/info/support-center" className="hover:underline">Support Center</Link>
            <Link to="/info/track-order" className="hover:underline">Track Your Order</Link>
            <Link to="/info/returns" className="hover:underline">Returns</Link>
            <Link to="/info/shipping" className="hover:underline">Shipping</Link>
            <Link to="/info/warranty" className="hover:underline">Lifetime Warranty</Link>
            <Link to="/info/product-registration" className="hover:underline">Product Registration</Link>
            <Link to="/info/corporate-sales" className="hover:underline">Corporate Sales</Link>
          </div>
        </div>

        <div>
          <h3 className="text-[24px] md:text-[27px] font-medium mb-7">CONTACT</h3>
          <div className="flex flex-col gap-4 text-[16px]">
            <Link to="/info/support-center" className="hover:underline">Contact Us</Link>
            <a href="https://www.instagram.com/peakdesign" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
            <a href="https://www.facebook.com/peakdesignltd" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://www.youtube.com/@PeakDesignLtd" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-16 md:mt-20 py-8 border-t border-gray-200 text-[13px] text-gray-500 flex flex-col sm:flex-row justify-between gap-3">
        <p>© {new Date().getFullYear()} Peak Design. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/info/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/info/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;