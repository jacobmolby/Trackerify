<template>
  <div class="flex flex-col">
    <label for="imageUpload" class="btn btn-gray">Upload New Image</label>
    <input
      id="imageUpload"
      type="file"
      class="hidden"
      alt="Upload New Image"
      @change="readyImage($event)"
    />
    <span>{{filename}}</span>
    <span class="text-red-500 py-1 text-sm italic">{{error}}</span>
  </div>
</template>

<script>
import axios from 'axios';
import ChangeImageService from '../../services/settingsServices/ChangeImageService';
export default {
  data: () => ({
    filename: 'No file selected',
    error: ''
  }),
  methods: {
    async uploadImage(file, signedRequest, imageUrl) {
      try {
        await axios.put(signedRequest, file, {
          headers: { 'Content-Type': file.type }
        });
        try {
          await this.$store.dispatch('changeProfileImage', { imageUrl });
        } catch (error) {
          this.$store.dispatch('notify', {
            message: error.response.data.error,
            type: 'error'
          });
        }
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error,
          type: 'error'
        });
      }
    },
    async getSignedRequest(file) {
      const encodedName = encodeURIComponent(file.name);
      const encodedFileType = encodeURIComponent(file.type);
      try {
        const response = (
          await ChangeImageService.get({
            encodedName,
            encodedFileType
          })
        ).data;
        this.uploadImage(file, response.signedRequest, response.imageUrl);
      } catch (error) {
        this.$store.dispatch('notify', {
          message: error.response.data.error,
          type: 'error'
        });
      }
    },
    readyImage(e) {
      this.error = '';
      if (!e.target.files.length) {
        return (this.filename = 'No file selected');
      }
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      const file = e.target.files[0];
      this.filename = file.name;

      if (!validImageTypes.includes(file.type)) {
        return (this.error = 'Uploaded file is not an image.');
      }
      if (file.size / 1024 > 2000) {
        return (this.error = "File can't be bigger than 2MB");
      }
      this.getSignedRequest(file);
    }
  }
};
</script>

<style>
</style>