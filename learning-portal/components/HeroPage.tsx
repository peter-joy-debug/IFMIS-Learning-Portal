
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';


export default function HeroPage() {

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
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
