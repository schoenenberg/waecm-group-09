FROM golang:1.14 AS builder

WORKDIR /go/src/waecm
COPY . /go/src/waecm/

RUN CGO_ENABLED=0 go build -v ./cmd/backend

# -----------------------------

FROM alpine:latest

COPY --from=builder --chown=root:root /go/src/waecm/backend /opt/bin/waecm-backend
CMD /opt/bin/waecm-backend
