import { test } from "@playwright/test";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import fs, { link } from "fs";

const baseUrl = 'https://www.dandelionchocolate.com';
const startPath = '/products/ka-cho-fu-getsu-bonbon-collection';
const crawled: string [] = [];
let discoveredLinks: string [] = [];
let discoveredImages: string [] = [];
let brokenLinks: string [] = [];
let brokenImages: string [] = [];

test('Test of broken links', async () => {
  async function crawl(url: string) {
    if(crawled.includes(url)) {
      return;
    }

    crawled.push(url);

    const response = await fetch(url);

    const text = await response.text();

    await handleHtmlDocument(text);

    const links = [...new Set(discoveredLinks)];
    discoveredLinks = [];
    brokenLinks = [];

    for (let i = 0; i < links.length; i++) {
      await crawl(links[i]);
    };
  };  

  await crawl(baseUrl + startPath);

  console.log("Links checked ", crawled.length);

  for (let i = 0; i < crawled.length; i++) {
    const linksResponse = await fetch(crawled[i]);
    if(linksResponse.status != 200) {
      brokenLinks.push(linksResponse.url);
      fs.writeFileSync("BrokenLinks.txt", brokenLinks.join('\n').toString())
    }
  }
});

function handleHtmlDocument(text:string){
  return unified()
    .use(rehypeParse)
    .use(rehypeStringify)
    .use(findUris)
    .process(text)
};
//There is also a functions for checking broken images, but the website blocks the test if this is run because of the too many requests.
/*
async function crawlImages() {
  const images = [...new Set(discoveredImages)];
  discoveredImages = [];

  for (let i =0; i < images.length; i++) {
    const responseImages = await fetch(images[i]);
    if(responseImages.status != 200) {
      brokenImages.push(responseImages.url);
      fs.writeFileSync("BrokenImages.txt", brokenImages.join('\n').toString())
    }
  }
};  */

function addUri(collection: string[], uri:string){
  if(uri.substring(0, 1) == '/' && uri.substring(1, 1) != '/') {
    if(uri.includes('www') == true) {
      collection.push('https://' + uri.substring(2, uri.length-2))
    }
    else{
      collection.push(baseUrl + uri);
    }
  }

  if(uri.indexOf(baseUrl) == 0) {
    collection.push(uri.split('#')[0]);
  }
};

function isString(s: string | any) : s is string {
  return typeof s == 'string';
};

function findUris(options = {}) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if(node.tagName == 'a' && node.properties && isString(node.properties.href)){
        addUri(discoveredLinks, node.properties.href);
      } else if (node.tagName == 'img' && node.properties) {
        if(isString(node.properties.src)) {
          addUri(discoveredImages, node.properties.src);
        }

        if (isString(node.properties.srcSet)) {
          (<string[]> node.properties.srcSet.split(','))
          .map(s => s.split(' ')[0])
          .forEach(s => addUri(discoveredImages, s));
        }
      }
    })
  }
};