<template>
  <div>
    <input type="file" id="file-input" />
    <p id="status">Please select a file</p>
    <img id="preview" src="/img/no-profile-picture.png" />

    <form method="POST" action="http://localhost:8001/save-details">
      <input type="hidden" id="avatar-url" name="avatar-url" value="/img/no-profile-picture.png" />
      <input type="text" name="username" placeholder="Username" />
      <br />
      <input type="text" name="full-name" placeholder="Full name" />
      <br />
      <br />
      <input type="submit" value="Update profile" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    uploadFile(file, signedRequest, url) {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url;
          } else {
            console.log(xhr.status);

            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    },
    getSignedRequest(file) {
      const encodedName = encodeURIComponent(file.name);
      const encodedFileType = encodeURIComponent(file.type);

      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `http://localhost:8001/sign-s3?file-name=${encodedName}&file-type=${encodedFileType}`
      );
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            this.uploadFile(file, response.signedRequest, response.url);
          } else {
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }
  },
  mounted() {
    document.getElementById('file-input').onchange = () => {
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if (file == null) {
        return alert('No file selected.');
      }
      this.getSignedRequest(file);
    };
  }
};
</script>

<style>
</style>