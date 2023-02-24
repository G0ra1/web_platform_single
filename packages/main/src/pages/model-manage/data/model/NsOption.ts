import VNodeChild from "naive-ui";

/*
 * @Author: zouliming 
 * @Date: 2022-10-18 11:04:48 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-20 08:50:24
 * @Description 一个命名空间
 */
export namespace NsOption {
    export class OptionSelect {
        label: string = '';
        value: string = '';
        constructor(label: string, value: string) {
            this.label = label;
            this.value = value;
        }
    }

    export class OptionAutoComplete {
        label!: string;
        description!: string;
        avatar!: string;
        constructor(label: string, description: string, avatar?: string) {
            this.label = label;
            this.description = description;
            if (avatar) this.avatar = avatar;
        }
    }

    export class OptionDropDown {
        label: string = '';
        key: string = '';
        icon: Function = () => VNodeChild;
        constructor(label: string, key: string, icon: Function) {
            this.label = label;
            this.key = key;
            this.icon = icon;
        }
    }
}
