
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../public/3.jpeg';
import Image from 'next/image'; // Import Next.js Image component

export default function HeroPage() {
const logoImage = logo;
console.log(logoImage);

  return (
<div className="hero bg-base-200 min-h-screen" style={{marginTop:'-20px'}}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">IFMIS Support System</h1>
      <p className="py-8">
Welcome to our IFMIS Support System!

Here, you can access previously created articles that provide guidance on system usability, explore our Frequently Asked Questions, and submit tickets for any issues or inquiries. Our team will get back to you promptly.

Feel free to reach out—we're here to help!
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
    <center>
    <div className="w-82">
        
             <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Coat_of_arms_of_Eswatini.svg/800px-Coat_of_arms_of_Eswatini.svg.png"
                alt="IFMIS Logo"
                width={450} 
                height={450} 

                className="rounded-full"
              />
       
        </div>
        </center>
      <form className="card-body">

        <div className="form-control mt-6">
          <button className="btn btn-info">Create Ticket</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
