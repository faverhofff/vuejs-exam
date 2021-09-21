import { RequestResult } from "@/core/model/request-result.model";
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

export default class BaseComponent extends Vue {
  @Prop() public requestInfo: RequestResult | null = null;
  public info: RequestResult | null = null

  @Watch('requestInfo', {deep: true})
  onchange(value: RequestResult) {
    this.info = JSON.parse(JSON.stringify(value))
  }
}