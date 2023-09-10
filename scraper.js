async function getSearchResult(query, tag, club) {
  const encodedTag = tag.replace(" ", "+");
  const encodedClub = club.replace(" ", "+");
  const encodedQuery = query.replace(" ", "+");

  const result = await fetch("https://cfi.iitm.ac.in/api/graphql", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.5",
      "content-type": "application/json",
      "sec-ch-ua": '"Chromium";v="116", "Not)A;Brand";v="24", "Brave";v="116"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      cookie: "G_ENABLED_IDPS=google",
      Referer: `https://cfi.iitm.ac.in/blog?search=${encodedQuery}&tag=${encodedTag}&club=${encodedClub}`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `{"operationName":"GetBlogs","variables":{"filters":{"clubName":["${club}"],"tagNames":["${tag}"],"search":"${query}"}},"query":"query GetBlogs($filters: FilterBlog) {\\n  getBlogs(Filters: $filters) {\\n    blogs {\\n      id\\n      title\\n      description\\n      image {\\n        name\\n        url\\n        __typename\\n      }\\n      author\\n      views\\n      readingTime\\n      status\\n      updatedAt\\n      club {\\n        id\\n        name\\n        email\\n        __typename\\n      }\\n      tags {\\n        id\\n        name\\n        __typename\\n      }\\n      createdBy {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}`,
    method: "POST",
  });
  const data = await result.json();

  return data.data.getBlogs.blogs;
}

module.exports = getSearchResult;
