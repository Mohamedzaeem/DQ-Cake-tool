"use client";

import Link from "next/link";
 import React from 'react';
 import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCustomer } from "@/hooks/useCustomer";
import { useAuth } from "@/hooks/useAuth";

export default function AddCustomerPage() {
  const {add} = useCustomer();
   const { currentUser, loading } = useAuth();
  const router = useRouter();


  const handleAddCustomer = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        add(
            formData.get('FirstName'),
            formData.get('LastName'),
            formData.get('Email'),
            formData.get('PhoneNumber'),
            formData.get('DateOrdered'),
            formData.get('Description')
        );


        form.reset();
        router.replace("/");
    };


    const hasRedirected = useRef(false);         // 5️⃣ Hook
  
    useEffect(() => {
      if (!loading && !currentUser && !hasRedirected.current) {
        hasRedirected.current = true;
        router.replace("/login");
      }
    }, [currentUser, loading, router]);
  
 if (loading) return <div>Loading...</div>;

  return (
    <div className="form-page">
        <div className="wrap">
          
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Add Customer</span>
          </nav>
    
          <h1>Add New Customer</h1>
    
      <br></br>

    <div className="form-card">
      <form id="addCustomerForm" onSubmit={handleAddCustomer}>
        <div className="form-group">
          <label for="FirstName">First Name</label>
          <input type="text" id="FirstName" name="FirstName" required />
        </div>

        <div className="form-group">
          <label for="LastName">Last Name</label>
          <input type="text" id="LastName" name="LastName" required />
        </div>

        <div className="form-group">
          <label for="Email">Email</label>
          <input type="email" id="Email" name="Email" />
        </div>

        <div className="form-group">
          <label for="PhoneNumber">Phone Number</label>
          <input type="tel" id="PhoneNumber" name="PhoneNumber" required />
        </div>

        <div className="form-group">
          <label for="DateOrdered">Date Ordered</label>
          <input type="date" id="DateOrdered" name="DateOrdered" required />
        </div>

        <div className="form-group">
          <label for="Description">Description</label>
          <textarea id="Description" name="Description" rows="4"></textarea>
        </div>

        <button type="submit" className="btn-add">Add Customer</button>
      </form>
    </div>
</div>
</div>
  );
}
