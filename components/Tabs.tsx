import {
	Tabs as TivetTabs,
	TabsContent as TivetTabsContent,
	TabsList as TivetTabsList,
	TabsTrigger as TivetTabsTrigger,
	ScrollArea,
} from "@tivet-gg/components";
import { Children } from "react";

export const Tab = ({ title, children }) => {
	return <TivetTabsContent value={title}>{children}</TivetTabsContent>;
};

export const Tabs = ({ children }) => {
	const titles = Children.map(children, (child) => child.props.title);
	return (
		<TivetTabs defaultValue={titles[0]}>
			<ScrollArea>
				<TivetTabsList>
					{titles.map((title) => (
						<TivetTabsTrigger key={title} value={title}>
							{title}
						</TivetTabsTrigger>
					))}
				</TivetTabsList>
			</ScrollArea>
			{children}
		</TivetTabs>
	);
};
