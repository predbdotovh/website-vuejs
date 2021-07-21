<script>
const PAGES_THRESHOLD = 3;

export default {
  name: "PaginableMixin",
  data() {
    return {
      page: {
        prev: false,
        current: 1,
        max: 0,
        next: false,
      },
    };
  },
  methods: {
    resetPagination() {
      this.page.prev = null;
      this.page.current = 1;
      this.page.max = 0;
      this.page.next = null;
    },
    calcPagination(data) {
      if (!data) {
        return;
      }

      this.page = {
        current: Math.floor(data.offset / data.reqCount) + 1,
        max: Math.ceil(data.total / data.reqCount),
        list: [],
      };

      if (this.page.current > 1) {
        this.page.prev = {
          path: this.$route.path,
          query: Object.assign({}, this.$route.query, {
            page: this.page.current - 1,
          }),
        };
      }
      const min = this.page.current - PAGES_THRESHOLD;
      let max = this.page.current + PAGES_THRESHOLD;
      for (let i = min; i <= max; i++) {
        if (i < 1) {
          max++;
          continue;
        }
        if (i > this.page.max) {
          break;
        }
        const q = Object.assign({}, this.$route.query);
        q.page = i;
        this.page.list.push({
          text: q.page,
          i: q.page,
          link: { path: this.$route.path, query: q },
        });
      }
      this.page.next = {
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {
          page: this.page.current + 1,
        }),
      };

      return data;
    },
  },
};
</script>
