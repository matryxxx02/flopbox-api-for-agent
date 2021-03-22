export default (req: any, res: any, next: () => void) => {
  console.log(req.proto, req.method, res.status, req.url);
  next();
};
