// start of Vue for bookcards library

var app = new Vue({
  el: "#app",
  data: {
    loading: true,
    books: [],
    search: ""
  },
  methods: {
    getData() {
      fetch("https://api.myjson.com/bins/zyv02", {
        method: "GET",
        headers: {}
      })
        .then(function(library) {
          console.log(library);
          return library.json();
        })
        .then(function(library) {
          console.log(library);
          app.books = library.books;
          app.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    getBooks() {
      return this.books.filter(book => {
        let titlefilter = book.title
          .toUpperCase()
          .includes(this.search.toUpperCase());
        let descriptionfilter = book.description
          .toUpperCase()
          .includes(this.search.toUpperCase());

        return titlefilter || descriptionfilter;
      });
    }
  },

  created() {
    this.getData();
  }
});
