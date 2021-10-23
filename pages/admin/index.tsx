import Wrapper from "@components/AdminWrapper";

type AdminProps = {
    session: Record<string, unknown>;
};

export default function Admin(props: AdminProps): JSX.Element {
    return <Wrapper session={props.session}>Hello world!</Wrapper>;
}
