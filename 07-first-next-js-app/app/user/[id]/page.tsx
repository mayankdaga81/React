// Here, we do not have page.tsx for the user folder, we directly have a page.tsx for the "[id]" folder, and this helps us to get dynamic URL.
// Note - the "id" is enclosed within [], which says that it it a dynamic field, and whatever come sin the URL after "user" will be [id].
// The URL in this case would be .../user/<id>
// ex - .../user/1
// ex - .../user/bnlfew

// We can also get the "Id" fromt he params. But, the params object can be async (a Promise) in certain cases. So you must unwrap it before using it.

async function UserId({ params }) {
  const { id } = await params;
  return <div>UserId: {id}</div>;
}

export default UserId;
