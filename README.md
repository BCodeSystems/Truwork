# TruWork – Contractor Job & Invoice Management Platform

TruWork is a mobile-first web application designed for independent contractors and service professionals to manage jobs, capture job-related photos, and generate professional invoices within a single streamlined workflow.

## Overview

This project is being built to simplify how service professionals track work and communicate value to customers. The focus is on creating a practical, easy-to-use system that replaces scattered tools with one cohesive application.

## Status

In progress (~70% complete)

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Authentication:** JWT  
- **API:** RESTful API architecture  
- **Database (Planned):** PostgreSQL (Neon)  

## Core Features

- Job creation and tracking  
- Before / During / After photo capture workflow  
- Invoice generation with job details and media  
- Customer management  
- Mobile-first interface optimized for field use  

## Architecture

- Separation between frontend and backend services  
- REST API for handling job, customer, and invoice data  
- Component-based UI for scalability and reuse  
- Designed to support relational data modeling (jobs, customers, invoices)  

## Challenges & Solutions

**Designing for non-technical users**  
→ Focused on a simple, mobile-first UI with clear workflows and minimal friction  

**Managing job-to-invoice relationships**  
→ Structured the application around connected entities (jobs, customers, invoices) to support real-world use cases  

**Balancing flexibility with simplicity**  
→ Built workflows that support both quick job entry and more detailed invoicing without overcomplicating the interface  

## Key Learnings

- Designing and structuring full-stack applications  
- Managing application state across multiple features  
- Building scalable UI systems for real-world use cases  
- Planning relational data structures for future database integration  

## Future Improvements

- Implement PostgreSQL (Neon) for relational data management  
- Expand API functionality for deeper data operations  
- Add scheduling and calendar features  
- Improve reporting and analytics  

## Author

Developed by BCode Systems
