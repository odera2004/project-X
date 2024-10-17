// Fetching Manga
function fetchManga() {
  fetch('https://project-x-yn5p.onrender.com/Manga')
      .then(response => response.json())
      .then(data => {
          const mangaContainer = document.getElementById("mangaList");
          mangaContainer.innerHTML = ''; // Clear previous content
          data.forEach(manga => {
              mangaContainer.innerHTML += `
              <div class="col-md-3 mb-2">
                  <div>
                      <img src="${manga.imageUrl}" class="img-fluid"/>
                      <h6 class="fw-bold">Title: ${manga.title}</h6>
                      <p class="col">${manga.description}</p>
                      <div class="column">
                          <p class="col">Author: ${manga.author}</p>
                          <p class="col">No. of pages: ${manga.pages}</p>
                          <div>
                              <button onclick="deleteManga('${manga.id}')" type="button" class="btn btn-warning">Delete</button>
                              <button onclick="editManga('${manga.id}')" type="button" class="btn btn-success">Edit</button>
                              <button onclick="viewManga('${manga.id}')" type="button" class="btn btn-success">View Manga</button>
                          </div>
                      </div>
                  </div>
              </div>`;
          });
      })
      .catch(error => console.error('Error fetching manga:', error));
}

// Edit button
function editManga(id) {
  fetch(`https://project-x-yn5p.onrender.com/Manga/${id}`)
  .then((res) => res.json())
  .then((data) => {
      const edit_container = document.getElementById("edit_container");
      edit_container.innerHTML = `
          <h5>Edit Manga</h5>
          <div id="update_message" class="text-success" role="alert"></div>
          <form id="update_post_form">
              <div class="mb-3">
                  <input type="text" class="form-control" id="edit_title" value="${data.title}" required placeholder="Title">
              </div>
              <div class="mb-3">
                  <input type="text" class="form-control" id="edit_imageUrl" value="${data.imageUrl}" required placeholder="Image URL">
              </div>
              <div class="mb-3">
                  <input type="text" class="form-control" id="edit_author" value="${data.author}" required placeholder="Author">
              </div>
              <div class="mb-3">
                  <input type="number" class="form-control" id="edit_pages" value="${data.pages}" required placeholder="No. of pages">
              </div>
              <div class="mb-3">
                  <textarea rows="4" required class="form-control" id="edit_description">${data.description}</textarea>
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
          </form>
      `;

      const edit_form = document.getElementById("update_post_form");

      edit_form.addEventListener("submit", (event) => {
          event.preventDefault();
          const title = document.getElementById("edit_title").value;
          const pages = document.getElementById("edit_pages").value;
          const description = document.getElementById("edit_description").value;
          const author = document.getElementById("edit_author").value;
          const image = document.getElementById("edit_imageUrl").value;

          fetch(`https://project-x-yn5p.onrender.com/Manga/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                  title:title,
                  pages:pages,
                  description:description,
                  author:author,
                  imageUrl: image,
              }),
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
              },
          })
          .then((response) => {
              if (!response.ok) throw new Error('Failed to update');
              fetchManga(); // Refresh the manga list
              const update_message = document.getElementById("update_message");
              update_message.innerText = "Post Updated Successfully";
          })
          .catch(error => console.error('Error updating manga:', error));
      });
  })
  .catch(error => console.error('Error fetching manga data:', error));
}

// Delete Manga
function deleteManga(id) {
  fetch(`https://project-x-yn5p.onrender.com/Manga/${id}`, {
      method: "DELETE"
  })
  .then((res) => {
      if (!res.ok) throw new Error('Failed to delete');
      alert("Manga deleted successfully");
      fetchManga(); // Refresh the manga list
  })
  .catch(error => console.error('Error deleting manga:', error));
}

// Add Manga
const addForm = document.getElementById("add_Manga_form");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;
  const imageUrl = document.getElementById("imageUrl").value;

  fetch('https://project-x-yn5p.onrender.com/Manga', {
      method: 'POST',
      body: JSON.stringify({
        title:title,
        pages:pages,
        description:description,
        author:author,
        imageUrl: imageUrl,
      }),
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
      },
  })
  .then(response => {
      if (!response.ok) throw new Error('Failed to add manga');
      alert("Manga added successfully");
      fetchManga(); // Refresh the manga list
      document.getElementById("exampleModal").modal('hide'); // Close the modal
  })
  // .catch(error => console.error('Error adding manga:', error));
});

// Initial fetch of manga
fetchManga();

// Display Single Manga
function viewManga(id) {
  fetch(`https://project-x-yn5p.onrender.com/Manga/${id}`)
  .then((res) => res.json())
  .then((data) => {
      const single_Manga = document.getElementById("single_Manga");
      single_Manga.innerHTML = `
          <div class="col-md-3 mb-2">
              <div>
                  <img src="${data.imageUrl}" class="img-fluid"/>
                  <h6 class="fw-bold">Title: ${data.title}</h6>
                  <p class="col">${data.description}</p>
                  <div class="column">
                      <p class="col">Author: ${data.author}</p>
                      <p class="col">No. of pages: ${data.pages}</p>
                      <div>
                          <button onclick="deleteManga('${data.id}')" type="button" class="btn btn-warning">Delete</button>
                          <button onclick="editManga('${data.id}')" type="button" class="btn btn-success">Edit</button>
                          <p>${data.description}</p>
                      </div>
                  </div>
              </div>
          </div>
      `;
  })
  // .catch(error => console.error('Error fetching single manga:', error));
}
