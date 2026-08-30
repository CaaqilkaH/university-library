const books = [
  {title:"Web Development Essentials", author:"J. Carter", category:"technology", icon:"💻"},
  {title:"JavaScript Fundamentals", author:"M. Smith", category:"technology", icon:"⚡"},
  {title:"Database Management", author:"A. Hassan", category:"technology", icon:"🗄️"},
  {title:"Principles of Management", author:"R. Williams", category:"business", icon:"📈"},
  {title:"Marketing Strategy", author:"L. Ahmed", category:"business", icon:"📣"},
  {title:"Financial Accounting", author:"K. Brown", category:"accounting", icon:"🧮"},
  {title:"Auditing Basics", author:"S. Ali", category:"accounting", icon:"📋"},
  {title:"Academic English", author:"D. Wilson", category:"english", icon:"🗣️"}
];

const bookGrid = document.getElementById("bookGrid");
const emptyMessage = document.getElementById("emptyMessage");

function renderBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const category = document.getElementById("categoryFilter").value;
  const filtered = books.filter(book =>
    (category === "all" || book.category === category) &&
    (book.title.toLowerCase().includes(query) ||
     book.author.toLowerCase().includes(query) ||
     book.category.toLowerCase().includes(query))
  );
  bookGrid.innerHTML = filtered.map(book => `
    <article class="book-card">
      <div class="book-cover">${book.icon}</div>
      <h3>${book.title}</h3>
      <p>By ${book.author}</p>
      <span class="tag">${book.category}</span>
    </article>
  `).join("");
  emptyMessage.hidden = filtered.length !== 0;
}
document.getElementById("searchInput").addEventListener("input", renderBooks);
document.getElementById("categoryFilter").addEventListener("change", renderBooks);
renderBooks();

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value;
  const password = document.getElementById("password").value;
  const agree = document.getElementById("agree").checked;
  const msg = document.getElementById("formMessage");

  if(name.length < 3) return showMessage(msg,"Please enter your full name.");
  if(id.length < 4) return showMessage(msg,"Please enter a valid student ID.");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showMessage(msg,"Please enter a valid email address.");
  if(!department) return showMessage(msg,"Please choose your department.");
  if(password.length < 6) return showMessage(msg,"Password must contain at least 6 characters.");
  if(!agree) return showMessage(msg,"Please accept the terms and conditions.");

  showMessage(msg,"✓ Registration successful! Your library account has been created.",true);
  registrationForm.reset();
});

function showMessage(element,text,success=false){
  element.textContent = text;
  element.style.color = success ? "#16a34a" : "#dc2626";
}

document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name=document.getElementById("contactName").value.trim();
  const email=document.getElementById("contactEmail").value.trim();
  const message=document.getElementById("contactMessage").value.trim();
  const result=document.getElementById("contactMessageResult");
  if(name.length<2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length<5)
    return showMessage(result,"Please complete all contact fields correctly.");
  showMessage(result,"✓ Message sent successfully. Thank you!",true);
  this.reset();
});

const themeBtn=document.getElementById("themeBtn");
themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  themeBtn.textContent=document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

const menuBtn=document.getElementById("menuBtn"), nav=document.getElementById("navMenu");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const slides=document.querySelectorAll(".slide"), dots=document.getElementById("dots");
let current=0;
slides.forEach((_,i)=>{
  const dot=document.createElement("span"); dot.className="dot"+(i===0?" active":"");
  dot.addEventListener("click",()=>showSlide(i)); dots.appendChild(dot);
});
function showSlide(i){
  current=i;
  slides.forEach((s,n)=>s.classList.toggle("active",n===i));
  document.querySelectorAll(".dot").forEach((d,n)=>d.classList.toggle("active",n===i));
}
setInterval(()=>showSlide((current+1)%slides.length),5000);

document.getElementById("year").textContent=new Date().getFullYear();
