import useDocumentTitle from "../hooks/usePageTitles";

const DMCA = () => {
  useDocumentTitle('DMCA Declaration | BingeBox');
  return (
    <div className='text-white/70 text-md mt-40 text-center mx-10'>
      <h1 className='text-3xl mb-6'>DMCA</h1>
      <p className='mb-4'>
        This website is in full compliance with the Digital Millennium Copyright
        Act, known as DMCA. Movies and TV shows are sourced through third-party
        APIs for which we, Movies Unlimited, have no control. We cannot offer
        content, fix any content issues, allow any content requests or in any
        other manner provide content that we have no rights, ownership, or
        express permission to use. We do not now nor will we ever store content
        on our own servers.{' '}
      </p>
      <p>
        {' '}
        We at Movies Unlimited understand the immense work and financial effort
        to make a quality movie or series and we do not encourage users to use
        this site in an attempt to escape appropriate remunerations for that
        entertainment. This site is an adjunct for people who pay for streaming
        services. Here at Movies Unlimited, we are continued monthly subscribers
        to Hulu, Netflix, Peacock, AppleTV, and others. We encourage our users
        to likewise support the entertainment industry and not abuse this
        website.{' '}
      </p>
    </div>
  );
};
export default DMCA;
