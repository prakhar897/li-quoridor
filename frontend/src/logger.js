import log from "loglevel";

if (process.env.NODE_ENV !== "production") {
	log.setLevel("trace");
} else {
	log.setLevel("error");
}

export default log;
