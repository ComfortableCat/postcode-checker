export default function Info() {
  return (
    <div className="flex flex-col justify-center items-center text-center w-[75vw] min-w-[350px] gap-4 max-w-[555px]">
      <h1 className="text-4xl mb-4 max-[490px]:text-3xl">
        Postcode Checker v2
      </h1>
      <h3 className="text-xl">
        This is an internal resource to check if &apos;any&apos; given postcode
        is in one of our funded LEPs or CAs
      </h3>
      <h4>
        If you think a postcode is valid but the postcode checker doesn't
        confirm this then please check&nbsp;
        <a
          href="https://www.gov.uk/find-local-council"
          className="text-[red] underline"
        >
          on the government website
        </a>
        .
      </h4>
      <p>
        Please send any missing postcodes or funding areas to&nbsp;
        <a
          href="mailto:rich.saunders@techeducators.co.uk"
          className="text-[red] underline"
        >
          Rich
        </a>
      </p>
    </div>
  );
}
