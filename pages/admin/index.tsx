import Wrapper from "@components/AdminWrapper";

type ComponentProps = {
    session: Record<string, unknown>;
};

export default function Component(props: ComponentProps): JSX.Element {
    return <Wrapper session={props.session}></Wrapper>;
}
