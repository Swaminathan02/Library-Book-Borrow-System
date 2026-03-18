// Load and display all members from backend
async function loadMembers() {
  try {
    const res = await fetch(API + "/members");
    const data = await res.json();
    const list = document.getElementById("memberList");
    list.innerHTML = "";
    if (!Array.isArray(data)) {
      list.innerHTML = "<li>No members found</li>";
      return;
    }
    data.forEach((m) => {
      const li = document.createElement("li");
      li.innerText = `memberId: ${m.memberId} | name: ${m.name} | email: ${m.email} | borrowLimit: ${m.borrowLimit}`;
      list.appendChild(li);
    });
  } catch (err) {
    alert("Failed to load members");
    console.log(err);
  }
}
const API = "http://localhost:5000/api";

async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const copies = document.getElementById("copies").value;

  await fetch(API + "/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author,
      totalCopies: copies,
    }),
  });

  alert("Book added");
}

async function loadBooks() {
  const res = await fetch(API + "/books");
  const data = await res.json();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  data.forEach((b) => {
    const li = document.createElement("li");
    li.innerText = b.bookId + " " + b.title + " copies:" + b.availableCopies;
    list.appendChild(li);
  });
}

async function borrowBook() {
  const memberId = document.getElementById("memberId").value;
  const bookId = document.getElementById("bookId").value;
  try {
    const res = await fetch(API + "/borrows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: Number(memberId),
        bookId: Number(bookId),
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else if (data.message) {
      alert(data.message);
    } else {
      alert("Borrowed");
    }
  } catch (err) {
    alert("Request failed");
    console.log(err);
  }
}

async function returnBook() {
  const memberId = document.getElementById("rMemberId").value;
  const bookId = document.getElementById("rBookId").value;
  try {
    const res = await fetch(API + "/borrows/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: Number(memberId),
        bookId: Number(bookId),
      }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else if (data.message) {
      alert(data.message);
    } else {
      alert("Returned");
    }
  } catch (err) {
    alert("Request failed");
    console.log(err);
  }
}

// Load and display borrow records with due date and fine
async function loadBorrows() {
  const res = await fetch(API + "/borrows");
  const data = await res.json();
  const list = document.getElementById("borrowList");
  list.innerHTML = "";
  if (!Array.isArray(data)) {
    list.innerHTML = "<li>No records found</li>";
    return;
  }
  data.forEach((b) => {
    const li = document.createElement("li");
    li.innerText = `BorrowId: ${b.borrowId} | Member: ${b.member} | Book: ${b.book} | Due: ${b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "-"} | Returned: ${b.returnDate ? new Date(b.returnDate).toLocaleDateString() : "No"} | Fine: ${b.fine || 0}`;
    list.appendChild(li);
  });
}

async function addMember() {
  const name = document.getElementById("mName").value.trim();
  const email = document.getElementById("mEmail").value.trim();
  const limit = document.getElementById("mLimit").value.trim();

  if (!name || !email) {
    alert("Name and Email fields required");
    return;
  }

  try {
    const res = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        email: email,
        borrowLimit: Number(limit),
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else if (data.message) {
      alert(data.message);
    } else {
      alert("Member added");
    }
  } catch (err) {
    alert("Request failed");
    console.log(err);
  }
}
