# 🧠 InsightDocs — Augmented Browsing with AI-Powered Documentation

### 🚀 Overview
**InsightDocs** is a Chrome Extension that delivers **instant AI-generated technical documentation** when developers highlight code-related text on any webpage.  
It eliminates the need to switch tabs or search documentation manually — helping developers stay in flow and work more efficiently.

---

### 💡 Problem Statement
While reading tutorials, blogs, or Stack Overflow answers, developers often need to **look up official documentation** or **understand syntax explanations**.  
Constant tab-switching disrupts focus and slows productivity.  
**InsightDocs** solves this by providing **AI-powered, context-aware technical documentation right where you need it** — on the same page.

---

### 🎯 Objective
To enhance developer workflow efficiency by integrating **LLM-generated explanations**, **syntax examples**, and **related FAQs** directly into the browsing experience.

---

### 🧩 Key Features
- ⚡ **Highlight & Learn:** Select any technical keyword or code snippet — get instant documentation without leaving the page.  
- 🧠 **AI-Powered Explanations:** Uses Cohere’s LLM API to generate simplified, contextual documentation.  
- 🌐 **Scalable Backend:** Node.js + Express.js backend serving 1,000+ structured responses daily.  
- 🧰 **Rich Frontend UI:** Responsive popup with syntax, examples, and FAQs; 40% faster access than manual searches.  
- 🔒 **Secure & Efficient:** Optimized caching and request handling for performance and stability.  

---

### 🏗️ Tech Stack
**Frontend:** React.js, JavaScript, Tailwind CSS, Chrome Extension API  
**Backend:** Node.js, Express.js  
**AI Integration:** Cohere LLM API  
**Database (optional):** MongoDB (for logging & analytics)  
**Version Control:** Git, GitHub  

---

### 🧱 Architecture Overview
1. **User Action:** Developer highlights a text snippet on any webpage.  
2. **Extension Popup:** Sends the selected text to backend API.  
3. **Backend Processing:** Node.js server calls Cohere’s LLM API for contextual documentation.  
4. **Response Display:** AI-generated explanations, syntax, examples, and FAQs appear instantly on-screen.  

---

### 📸 Demo
<img width="1346" height="604" alt="Capture1" src="https://github.com/user-attachments/assets/6f634bae-33fb-4114-a6cc-a83aae8af3e6" />
<img width="1366" height="602" alt="Capture" src="https://github.com/user-attachments/assets/f3d76efa-971f-42f3-a07d-035b252354c4" />

