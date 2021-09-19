import { ComponentStory, ComponentMeta } from "@storybook/react"

import SearchBar from "components/Base/SearchBar"

export default {
    title: "Example/SearchBar",
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = args => <SearchBar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    searchText: "",
    setSearchText: text => console.log(text),
}
