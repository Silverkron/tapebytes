// Converts the generator's controlled, static main content, not arbitrary HTML.
export function pageMarkdown(html,{url,title,description,lang}){
 const content=html.match(/<main\b[^>]*>([\s\S]*?)<section id="operation"/)[1];
 const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
 const text=content
  .replace(/<(svg|canvas|script|select|button)\b[^>]*>[\s\S]*?<\/\1>/g,'')
  .replace(/<(span|i)\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/g,'')
  .replace(/<input\b[^>]*>/g,'')
  .replace(/<br\s*\/?\s*>/g,' ')
  .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,(_,href,body)=>` [${plain(body).trim()}](${new URL(plain(href),url).href}) `)
  .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g,(_,level,body)=>`\n\n${'#'.repeat(Number(level))} ${plain(body)}\n\n`)
  .replace(/<li\b[^>]*>/g,'\n- ')
  .replace(/<\/(?:p|div|section|aside|details|summary|ol|ul|label|progress)>/g,'\n\n')
  .replace(/<[^>]*>/g,' ');
 return `<!-- Language: ${lang} -->\n\nSource: ${url}\n\n${title}\n\n${description}\n\n${plain(text).replace(/[ \t]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim()}\n`;
}
