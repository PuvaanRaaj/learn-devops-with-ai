import VerifyView from "@/components/VerifyView";

// A static page; the certificate code is read from the query string at runtime
// (e.g. /verify?code=DLP-XXXXXXXX) so it works with the static export.
export default function Page() {
  return <VerifyView />;
}
