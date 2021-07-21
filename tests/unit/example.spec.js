import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";

describe("Pagination.vue", () => {
  it("renders nothing without props", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {},
    });
    expect(wrapper.text()).toMatch("");
  });
});
