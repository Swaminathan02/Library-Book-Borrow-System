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

  await fetch(API + "/borrow", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      memberId: Number(memberId),
      bookId: Number(bookId),
    }),
  });

  alert("Borrowed");
}

async function returnBook() {
  const memberId = document.getElementById("rMemberId").value;

  const bookId = document.getElementById("rBookId").value;

  await fetch(API + "/borrow/return", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      memberId: Number(memberId),
      bookId: Number(bookId),
    }),
  });
  alert("Returned");
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
