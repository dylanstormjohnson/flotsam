import Page from "../components/Page";

const headContent = (
  <>
    <title>FlotSam - 404</title>
    <meta name="description" content="404 Error, page not found." />
  </>
);

export default function Page404() {
  return (
    <Page className="normalBackground" isProtected={false} headContent={headContent}>
      <div>404 Page Not Found</div>
    </Page>
  );
}
