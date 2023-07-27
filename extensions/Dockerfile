FROM golang:1.20-alpine3.17 as builder
WORKDIR $GOPATH/src/go.k6.io/k6
COPY . /extensions
RUN apk --no-cache add git=~2
RUN git clone --depth 1 --branch v0.45.0 https://github.com/grafana/k6.git $GOPATH/src/go.k6.io/k6
ENV CGO_ENABLED=0
RUN go install -a -trimpath -ldflags "-s -w -X go.k6.io/k6/lib/consts.VersionDetails=$(date -u +"%FT%T%z")/$(git describe --tags --always --long --dirty)"
RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN cp /go/bin/k6 /go/src/go.k6.io/k6/k6
# Install extensions

# Runtime stage
FROM alpine:3.17 as release

# hadolint ignore=DL3018
RUN apk add --no-cache ca-certificates && \
    adduser -D -u 12345 -g 12345 k6
COPY --from=builder /go/src/go.k6.io/k6/k6/ /usr/bin/k6

# logs directory
RUN mkdir -p /logs
VOLUME /logs
# give non-root user access to logs directory
RUN chown -R k6:k6 /logs

USER k6
WORKDIR /home/k6

ENTRYPOINT ["/usr/bin/k6"]
